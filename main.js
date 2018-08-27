var i = 0
var images = []
var time = 5000

images[0] = 'images/beer.jpg'
images[1] = 'images/snacks.jpg'
images[2] = 'images/wine.jpg'

function changeImg() {
	document.slide.src = images[i]

	if (i < images.length - 1) {
		i++
	} else {
		i = 0
	}

	setTimeout('changeImg()', time)
}

window.onload = changeImg

$(document).ready(function() {

	$('#tabs ul li:first-child a').addClass('active')
	
	$('#tabs section').first().addClass('show')

	$('#tabs ul li a').on('click', function() {
		if (!$(this).hasClass('active')) {
		var id = $(this).attr('href')
		$('#tabs ul li a').removeClass('active')
		$(this).addClass('active')
		$('#tabs section').removeClass('show')
		$(id).addClass('show')
		}
	})

	$.ajax({
		'method': 'get',
		'url': 'https://obscure-tundra-54269.herokuapp.com/casual-dining',
		'dataType': 'json'
	})
	.done(function(data) {
		console.log(data)

	const section = document.querySelector("#menu")

	const appetizers = data.appetizers.map(function(item) {
		var appExtra = ''
		if (item.extra.spicy == true) {
			appExtra += '&#9832; '
		}
		if (item.extra.glutenfree == true) {
			appExtra += '&#10030; '
		}
		if (item.extra.vegetarian == true) {
			appExtra += '&#10050;'
		}
		return `
			<h3>${item.name} | $${item.price}</h3>
			<p>${item.description}</p>
			<p class="extras">${appExtra}</p>
			<p class="key">&#9832; = Spicy  |  &#10030; = Gluten Free  |  &#10050; = Vegetarian</p>
		`
	}).join('\n')

	const entrees = data.entrees.map(function(item) {
		var entExtra = ''
		if (item.extra.spicy == true) {
			entExtra += '&#9832; '
		}
		if (item.extra.glutenfree == true) {
			entExtra += '&#10030; '
		}
		if (item.extra.vegetarian == true) {
			entExtra += '&#10050;'
		}
		return `
			<h3>${item.name} | $${item.price}</h3>
			<p>${item.description}</p>
			<p class="extras">${entExtra}</p>
			<p class="key">&#9832; = Spicy  |  &#10030; = Gluten Free  |  &#10050; = Vegetarian</p>
		`
	}).join('\n')

	const desserts = data.desserts.map(function(item) {
		var desExtra = ''
		if (item.extra.spicy == true) {
			desExtra += '&#9832; '
		}
		if (item.extra.glutenfree == true) {
			desExtra += '&#10030; '
		}
		if (item.extra.vegetarian == true) {
			desExtra += '&#10050;'
		}
		return `
			<h3>${item.name} | $${item.price}</h3>
			<p>${item.description}</p>
			<p class="extras">${desExtra}</p>
			<p class="key">&#9832; = Spicy  |  &#10030; = Gluten Free  |  &#10050; = Vegetarian</p>
		`
	}).join('\n')

	const ourMenu = '<h1>Our Dinner Menu</h1>\n'

	const menu = ourMenu.concat('<h2>Appetizers</h2>\n', appetizers, '<h2>Entrees</h2>\n', entrees, '<h2>Desserts</h2>\n', desserts)

	section.innerHTML = menu
	})
})