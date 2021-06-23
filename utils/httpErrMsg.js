export function getHttpErrMsg(errMsg){
	
	return httpErrMsg[errMsg]||errMsg.replace(/(request:fail)|(。)/g,"") 
	
}

export function isHttpErrMsg(errMsg){
	
	 return httpErrMsg[errMsg]
}

const httpErrMsg = {
		"request:fail 请求超时":"网络缓慢，请求超时",
		"request:fail 请求超时。":"网络缓慢，请求超时",
		"request:fail 似乎已断开与互联网的连接。":"似乎已断开与互联网的连接",
		"request:fail 网络连接已中断。":"网络连接已中断",
		"request:fail 要求逾時。":"网络缓慢，请求超时",
		"request:fail 目前不允许数据连接。":"目前不允许数据连接",
		"request:fail 发生了SSL错误，无法建立与该服务器的安全连接。":"发生了SSL错误，无法建立与该服务器的安全连接",
		"request:fail 无法连接服务器。":"无法连接服务器",
		"request:fail 未能找到使用指定主机名的服务器。":"未能找到使用指定主机名的服务器",
		"request:fail 網絡連線中斷。":"网络连接中断",
		"request:fail 无法解析响应":"无法解析响应",
		"request:fail timeout":"网络缓慢，请求超时",
		"request:fail 未能完成操作。（kCFErrorDomainCFNetwork错误310。）":"未能完成操作。（kCFErrorDomainCFNetwork错误310。）",
		"request:fail -7:net::ERR_TIMED_OUT":"网络缓慢，请求超时",
		"request:fail -15:net::ERR_SOCKET_NOT_CONNECTED":"长链接没有连接上(ERR_SOCKET_NOT_CONNECTED)",
		"request:fail net::ERR_TIMED_OUT":"网络缓慢，请求超时",
		"request:fail -100:net::ERR_CONNECTION_CLOSED":"网络缓慢，请求错误(ERR_CONNECTION_CLOSED)",
		"request:fail -101:net::ERR_CONNECTION_RESET":"连接复位(ERR_CONNECTION_RESET)",
		"request:fail -102:net::ERR_CONNECTION_REFUSED":"连接被拒绝(ERR_CONNECTION_REFUSED)",
		"request:fail -103:net::ERR_CONNECTION_ABORTED":"连接被中止(ERR_CONNECTION_ABORTED)",
		"request:fail -105:net::ERR_NAME_NOT_RESOLVED":"名称未解析(ERR_NAME_NOT_RESOLVED)",
		"request:fail -109:net::ERR_ADDRESS_UNREACHABLE":"地址无法访问(ERR_ADDRESS_UNREACHABLE)",
		"request:fail -118:net::ERR_CONNECTION_TIMED_OUT":"网络缓慢，连接超时(ERR_CONNECTION_TIMED_OUT)",
		"request:fail -130:net::ERR_PROXY_CONNECTION_FAILED":"代理连接失败(ERR_PROXY_CONNECTION_FAILED)",
		"request:fail -200:net::ERR_CERT_COMMON_NAME_INVALID":"证书公共名称无效(ERR_CERT_COMMON_NAME_INVALID)",
		"request:fail -201:net::ERR_CERT_DATE_INVALID":"证书日期无效(ERR_CERT_DATE_INVALID)",
		"request:fail -202:net::ERR_CERT_AUTHORITY_INVALID":"错误证书无效(ERR_CERT_AUTHORITY_INVALID)",
		"request:fail -324:net::ERR_EMPTY_RESPONSE":"错误空响应(ERR_EMPTY_RESPONSE)",
		"request:fail net::ERR_CONNECTION_TIMED_OUT":"网络缓慢，连接超时(ERR_CONNECTION_TIMED_OUT)",
		"request:fail interrupted":"无法连接服务器(interrupted)",
		"request:fail net::ERR_EMPTY_RESPONSE":"空响应(ERR_EMPTY_RESPONSE)",
		"request:fail net::ERR_CERT_COMMON_NAME_INVALID":"证书公共名称无效(ERR_CERT_COMMON_NAME_INVALID)",
		"request:fail net::ERR_CONNECTION_RESET":"连接复位(ERR_CONNECTION_RESET)",
		"request:fail request unknow host error":"请求未知主机错误(request unknow host error)",
		"request:fail net::ERR_CERT_AUTHORITY_INVALID":"错误证书无效(ERR_CERT_AUTHORITY_INVALID)",
		"request:fail net::ERR_CONNECTION_CLOSED":"网络缓慢，请求错误(ERR_CONNECTION_CLOSED)",
		"request:fail net::ERR_NAME_NOT_RESOLVED":"名称未解析(ERR_NAME_NOT_RESOLVED)",
		"request:fail net::ERR_SOCKET_NOT_CONNECTED":"长链接没有连接上(ERR_SOCKET_NOT_CONNECTED)",
		"request:fail net::ERR_PROXY_CONNECTION_FAILED":"错误代理连接失败(ERR_PROXY_CONNECTION_FAILED)",
		"request:fail net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":"错误SSL版本或密码不匹配(ERR_SSL_VERSION_OR_CIPHER_MISMATCH)"
}
