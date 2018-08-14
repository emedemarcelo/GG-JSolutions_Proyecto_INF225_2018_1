# API.R

library(jsonlite)

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg=""){
  list(msg = paste0("The message is: '", msg, "'"))
}

#* Echo back the input
#* @param msg The message to echo
#* @post /analysis
function(n_trayectorias, riskRate, values){
  data = fromJSON(txt=values)
  print(na.omit(data$adjClose))
  list(
    trayectories = n_trayectorias,
    risk_rate = riskRate,
    datatoProcess = na.omit(data$adjClose)
  )
}