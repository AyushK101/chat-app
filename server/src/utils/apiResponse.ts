export default class ApiResponse {
  constructor(
    public statusCode: string,
    public message: string,
    public data: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
