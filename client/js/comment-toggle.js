$(document).on('click', '.comment-div-toggle', function() {
	var comment_area = $(this).siblings('.comment-div');
	var icon = $(this).children('i');
	icon.toggleClass('rotate-up');
	comment_area.toggle('fast');
});