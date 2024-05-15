export class CustomError extends Error {
  statusCode: number;
  fileName: string;
  methodName: string;

  constructor(
    message: string,
    statusCode: number,
    fileName: string,
    methodName: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.fileName = fileName;
    this.methodName = methodName;
  }
}
