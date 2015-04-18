hotdogs <- read.csv("http://datasets.flowingdata.com/hot-dog-contest-winners.csv", sep=",", header=TRUE)

fill_colors <- c()
for (i in 1:length(hotdogs$Country)) {
  if (hotdogs$Country[i] == "United States") {
    fill_colors <- c(fill_colors, "#821122")
  } else {
    fill_colors <- c(fill_colors, "#cccccc")
  }
}

fill_colors <- c()
for (i in 1:length(hotdogs$New.record)) {
  if (hotdogs$New.record[i] == 1) {
    fill_colors <- c(fill_colors, "#821122")
  } else {
    fill_colors <- c(fill_colors, "#cccccc")
  }
}

barplot(hotdogs$Dogs.eaten, 
        names.arg=hotdogs$Year, 
        col=fill_colors, 
        border=NA, 
        xlab="Année", 
        ylab="Hot-Dogs et sandwichs avalés",
        space=0.3,
        main="Nathan's Hot Dog Eating Contest Results, 1980-2010")

hot_dog_places <- read.csv("http://datasets.flowingdata.com/hot-dog-places.csv",
                           sep=",",
                           header=TRUE)

names(hot_dog_places) <- c("2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010")

hot_dog_matrix <- as.matrix(hot_dog_places)

barplot(hot_dog_matrix, 
        border=NA, 
        space=0.25, 
        ylim=c(0, 200), 
        xlab="Année",
        ylab="Hots-dogs et sandwichs avalés",
        main="Résultats du concours du plus gros mangeur de hot-dogs 1980-2010")