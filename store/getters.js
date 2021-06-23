const getters = {
  //登录相关
  token: state => state.login.token,
  userLocation: state => state.login.userLocation,
  userInfo: state => state.login.userInfo,
  wxUserInfo: state => state.login.wxUserInfo,
  uid: state => state.login.uid,
  //系统相关
  isConnected: state => state.app.isConnected,
  adData: state => state.personal.adData
}
export default getters