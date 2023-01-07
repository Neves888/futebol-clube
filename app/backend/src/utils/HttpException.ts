export default class HttpException {
  code: number;
  response: string;

  constructor(code: number, response: string) {
    this.response = response;
    this.code = code;
  }
}
