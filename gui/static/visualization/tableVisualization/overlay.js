$(document).on({
    mouseenter: function () {
        $(this).find('.overlay').show();
    },
    mouseleave: function () {
        $(this).find('.overlay').hide();
    }
}, '.dsRow');



/*$(document).ready(function(){
	$('.dsRow').mouseover(function() {
		console.log(this.id);
        //$('#overlay-'+ this.id).show();
	//}).mouseout(function () {
        $('#overlay-'+ this.id).hide();
    });
});
*/
