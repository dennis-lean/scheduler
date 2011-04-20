<!DOCTYPE html>
<html lang="en">
	<head>
		<link type="text/css" rel="stylesheet" href="style.css" />
		<script type="text/javascript" src="jquery-1.4.1.min.js"></script>
		<script type="text/javascript" src="scheduler.js"></script>
	</head>
	<body>
		<?php $pilots = array('Mior Muhammad Zaki', 'Chan'); ?>
		<table>
			<colgroup id="colgroup-pilot"></colgroup>
			<colgroup id="colgroup-date" span="30" class="colgroup-date"></colgroup>
			<thead>
				<tr>
					<th></th>
					<?php for($i = 1; $i <= 30; $i++) : ?>
						<th><?php echo $i; ?></th>
					<?php endfor; ?>
				</tr>
			</thead>
			<tbody>
				<?php foreach($pilots as $pilot) : ?>
				<tr>
					<th><?php echo $pilot; ?></th>
					<?php for($i = 1; $i <= 30; $i++) : ?>
						<td scope="colgroup">&nbsp;</td>
					<?php endfor; ?>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
		
	</body>
</html>