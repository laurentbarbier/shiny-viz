postage <- read.csv("http://datasets.flowingdata.com/us-postage.csv",
                    sep=",",
                    header=TRUE)

plot(postage$Year, 
     postage$Price, 
     type="s",
     main="US Postage Rates for Letters. First Ounce. 1991-2010",
     xlab="Année",
     ylab="Prix du timbre (dollars)")