"/*Semantic UI example layout: Login Form
   https://semantic-ui.com/examples/login.html*/"
!html
	!head
		!meta@charset utf-8
		!meta@http-equiv X-UA-Compatible@content IE=edge,chrome=1
		!meta@name viewport@content width=device-width, initial-scale=1.0, maximum-scale=1.0

		!title
			%Login Example - Semantic

		"['reset','site','container','grid','header','image','menu','divider','segment','form','input','button','list','message','icon']
			.map(style=>write(2,'!link@rel stylesheet@type text/css@href ../dist/components/'+style+'.css'));' '"

		!script@type text/javascript@src https://gc.kis.v2.scr.kaspersky-labs.com/F09BB52B-13B8-6C4D-9713-D62313E9AD46/main.js@charset UTF-8
		!link@rel stylesheet@crossorigin anonymous@href https://gc.kis.v2.scr.kaspersky-labs.com/64DA9E31326D-3179-D4C6-8B31-B25BB90F/abn/main.css
		!script@src assets/library/jquery.min.js
		!script@src ../dist/components/form.js
		!script@src ../dist/components/transition.js

		!style@type text/css
			%body{background-color:#DADADA}body > .grid{height:100%}.image{margin-top:-100px}.column{max-width:450px}
		!script
			%$(document).ready(function(){$('.ui.form').form({fields:{email:{identifier:'email',rules:[{type:'empty',prompt:'Please enter your e-mail'},{type:'email',prompt:'Please enter a valid e-mail'}]},password:{identifier:'password',rules:[{type:'empty',prompt:'Please enter your password'},{type:'length[6]',prompt:'Your password must be at least 6 characters'}]}}})});

	!body
		.middle aligned center aligned grid
			column
				!h2.teal image header
					image@src assets/images/logo.png
					content
						%Log-in to your account
				!form.large form
					.stacked segment
						field
							!div.left icon input
								user icon
								!input@type text@name email@placeholder E-mail address
						field
							.left icon input
								lock icon
								!input@type password@name password@placeholder Password
						.fluid large teal submit button
							%Login
					.error message
				.message
					%New to us?
					!a@href #
						%Sign Up

