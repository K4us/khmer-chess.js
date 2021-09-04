/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
declare var Base64: {
    _keyStr: string;
    encode: (input: string) => string;
    decode: (input: string) => string;
    _utf8_encode: (string: string) => string;
    _utf8_decode: (utftext: string) => string;
};
export default Base64;
