const weeks = [
    {
        labels: "Week 1 notes",
        url: "week1/index.html"
    },
    {
        labels: "Week 2 notes",
        url: "week2/index.html"
    },
    {
        labels: "Week 3 notes",
        url: "week3/index3.html"
    },
    {
        labels: "Week 4 notes",
        url: "week4/index4.html"
    },
    {
        labels: "Week 5 notes",
        url: "week5/index5.html"
    },
    {
        labels: "Week 6 notes",
        url: "week6/index6.html"
    },
    {
        labels: "Week 7 notes",
        url: "week7/index7.html"
    },
    {
        labels: "Week 8 notes",
        url: "week8/index8.html"
    },
    {
        labels: "Week 9 notes",
        url: "week9/index9.html"
    },
    {
        labels: "Week 10 notes",
        url: "week10/index10.html"
    },
    {
        labels: "Week 11 notes",
        url: "week11/index11.html"
    },
    {
        labels: "Week 13 Final Project",
        url: "finalProject/index.html"
    }
];

var list = weeks.map(function (link) {
    return ("<li><a href=" + link.url + ">" + link.labels + "</a></li>");
  });
  document.getElementById("wlist").innerHTML = list.join('');