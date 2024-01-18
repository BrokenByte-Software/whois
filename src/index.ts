import {TcpSocketConnectOpts, createConnection} from 'net';
import {parseAsArray, parseAsObject} from './parse';

export enum WellKnownKeys {
  /** Responsible Server Address */
  Whois = 'whois',

  /** Domain Status: ACTIVE,  */
  Status = 'status',

  /** Creation Date */
  Created = 'created',

  /** Last Update Date */
  Changed = 'changed',

  /** Data Source */
  Source = 'source',

  /** DNS Server/s */
  NServer = 'nserver',
}

type GetDataOptions = Partial<Pick<TcpSocketConnectOpts, 'host' | 'port'>>;

const GET_DATA_DEFAULT_OPTIONS = {
  host: 'whois.iana.org',
  port: 43,
};

async function getData(
  domain: string,
  options?: GetDataOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = createConnection({...GET_DATA_DEFAULT_OPTIONS, ...options});
    const buffers: Array<Buffer> = [];
    client.on('data', buffer => {
      buffers.push(buffer);
    });
    const errors: Array<Error> = [];
    client.on('error', error => {
      errors.push(error);
    });
    client.on('close', () => {
      if (errors.length) {
        reject(errors[0]);
      } else {
        if (buffers.length === 0) {
          reject(new Error('NO_DATA'));
        } else {
          resolve(Buffer.concat(buffers).toString('utf-8'));
        }
      }
    });
    client.write(Buffer.from(`${domain}\r\n`));
  });
}

export enum ResultFormat {
  Raw = 'raw',
  Object = 'object',
  Array = 'array',
}

export async function whois<
  Format extends ResultFormat = ResultFormat.Raw,
  Result = Format extends ResultFormat.Raw
    ? string
    : Format extends ResultFormat.Array
    ? ReturnType<typeof parseAsArray>
    : Format extends ResultFormat.Object
    ? ReturnType<typeof parseAsObject>
    : unknown,
>(
  domain: string,
  options?: GetDataOptions & {format?: Format}
): Promise<Result> {
  const data = await getData(domain, options);

  if (options) {
    if ('format' in options) {
      switch (options.format) {
        case 'array':
          return parseAsArray(data) as Result;
        case ResultFormat.Object:
          return parseAsObject(data) as Result;
        default:
          return data as Result;
      }
    }
  }

  return data as Result;
}
