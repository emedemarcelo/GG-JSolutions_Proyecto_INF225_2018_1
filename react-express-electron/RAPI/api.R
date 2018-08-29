# API.R

library(jsonlite)
library(Sim.DiffProc)
library(base64enc)

graphPrecios = function(X){
  plot(X, plot.type="single", xlim= c(0,1), xlab="Tiempo normalizado", ylab= "Valor de acción", main="Valor de acción vs tiempo")
  lines(as.vector(time(X)),rowMeans(X),col="red")
}

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg=""){
  list(msg = paste0("The message is: '", msg, "'"))
}

#* @png (width = 150, height=150)
#* @get /littlepng
function(){
  x <- plot(1:10)
  x
}

#* Echo back the input
#* @param msg The message to echo
#* @png
#* @post /analysis
function(n_trayectorias, riskRate, values){
  data = fromJSON(txt=values)
  values = na.omit(data$adjClose)
  trayectories = strtoi(n_trayectorias, base = 0L)
  risk_rate <- riskRate
  days <- length(na.omit(data$adjClose))
  mu <- mean(values)
  sig <- sd(values)
  X <- GBM(M=trayectories, x0 = values[1], T=1, t0 = 0, theta = mu/days, sigma = sig/days)
  result <- graphPrecios(X)
  result
}
