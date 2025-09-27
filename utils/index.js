const ObjectId = require('mongodb').ObjectId;

const StatusCodes = (StatusCodes => {
    for (const resType of Object.values(StatusCodes)) for (const [codeName, code] of Object.entries(resType)) StatusCodes[codeName] = code;
    return StatusCodes;
})({
    info: {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103
    },
    success: {
        OK: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        IMUsed: 226
    },
    redirect: {
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        deprecated_UseProxy: 305,
        reserved_usused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308
    },
    userError: {
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        ContentTooLarge: 413,
        URITooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        Imateapot: 418,
        MisdirectedRequest: 421,
        UnprocessableContent: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451
    },
    serverError: {
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HTTPVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511
    }
});

/**
 * @param {string} id - id to validate
 * @returns {ObjectId|false} a valid ObjectId from the id string or false if invalid
 */
const validateId = id => {
    let result;
    try {
        result = new ObjectId(id);
    } catch {
        result = false;
    }
    return result;
};

class SchemaError extends Error {
    name = 'SchemaError';
    constructor(message) {
        super(message);
    }
}

class SchemaMissingError extends SchemaError {
    constructor(prop, schema) {
        super(`"${schema}" must contain "${prop}"`);
    }
}

class SchemaTypeError extends SchemaError {
    constructor(propName, type, prop) {
        super(`"${propName}" must be of type "${type}", got "${typeof prop}" (${prop})`);
    }
}

const handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { StatusCodes, handleErrors, validateId, SchemaError, SchemaMissingError, SchemaTypeError };
