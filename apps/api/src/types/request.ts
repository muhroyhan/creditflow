import { Request } from 'express'

export interface RequestGetMethod<T> extends Request<{}, {}, {}, T> {}

export interface RequestPostPatchMethod<T> extends Request<{}, T> {}
