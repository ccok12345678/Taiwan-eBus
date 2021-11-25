function GetAuthorizationHeader() {
  const AppID = '9e27d13db39d4912aff8f848a69129a7';
  const AppKey = 'tB70A0MwIeso6fgs5juocbG-m2A';

  const GMTString = new Date().toGMTString();
  // 使用jsSHA加密
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return { 'Authorization': Authorization, 'X-Date': GMTString };
}

export default GetAuthorizationHeader;