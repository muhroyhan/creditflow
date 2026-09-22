import { Request } from 'express'

export interface RequestGetMethod<T> extends Request<{}, {}, {}, T> {}
