<a href="#calc-info" class="open-modal">Открыть форму</a>
<div id="calc-info">
<div class="calc-wrapper">
<!--form.calkulyator>select.select*2>option{option$}[value="$"]*5-->


	<form action="" class="calkulyator">

		<!--label[for='fio']{Ф.И.О.}+input[type='text' id='fio' name='fio']+label[for='email']{E-mail}+input[type='email' id='email' name='email']+label[for='phone']{TEL}+input[type='text' id='phone' name='phone']-->
		<label for="fio">Ф.И.О.</label>
		<input type="text" class="fio" name="fio">
		<label for="email">E-mail</label>
		<input type="email" class="email" name="email">
		<label for="phone">TEL</label>
		<input type="text" class="phone" name="phone">

		<select name="" id="" class="select1">
			<option value="10">option1</option>
			<option value="20">option2</option>
			<option value="30">option3</option>
			<option value="40">option4</option>
			<option value="50">option5</option>
		</select>
		<select name="" id="" class="select2">
			<option value="10">option1</option>
			<option value="20">option2</option>
			<option value="30">option3</option>
			<option value="40">option4</option>
			<option value="50">option5</option>
		</select>
			<p>Умножение</p>
			<input class="result" type="text" disabled value="0">
			<p>Сумма</p>
			<input class="sum" type="text" disabled value="0">
			
			
	</form>
	<!--.info>p.fio+p.email+p.phon+p.result+p.sum-->
	<div class="info">
		<p class="fio">F</p>
		<p class="email">E</p>
		<p class="phone">P</p>
		<p class="result">R</p>
		<p class="sum">S</p>
	</div>
	<!--input.previw[type='submit' value='предпросмотр']
	input.send[type='submit' value='отправить']-->
	<input type="submit" class="previw" value="Предпросмотр">
	<input type="submit" class="send" value="Отправить">
	<input type="submit" class="back" value="Вернуться">
	<input type="submit" class="clouse-form" value="Закрыть">
</div>
</div>