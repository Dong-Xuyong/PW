document.addEventListener('DOMContentLoaded', function () {

	[].forEach.call(document.querySelectorAll('form'), function (form) {
		switch (form.getAttribute('name')) {
			case 'demo-form-1':
				new Validator(form, function (err, res) {

				});
				break;


		}
	});
});
