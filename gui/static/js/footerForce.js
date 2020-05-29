function moveFooter()
{
   $('#page-container').css("height", $(document).height()-50);
}

function footer()
{
   $('footer').css("top", $(document).height());
   //$('footer').css("bottom", 0);
}
moveFooter();
footer();