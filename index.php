<!DOCTYPE html>
<html lang="en">
	<head>
		<link type="text/css" rel="stylesheet" href="style.css" />
		<script type="text/javascript" src="js/jquery-1.4.1.min.js"></script>
		<script type="text/javascript" src="js/scheduler.js"></script>
	</head>
	<body>
		<?php $pilots = array('Mior Muhammad Zaki', 'Chan'); ?>
		<table>
			<colgroup id="colgroup-pilot"></colgroup>
			<colgroup id="colgroup-date" span="30" class="colgroup-date"></colgroup>
			<thead>
				<tr id="dataset-months">
					<th></th>
				</tr>
				<tr id="dataset-days">
					<th></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach($pilots as $pilot) : ?>
				<tr class="dataset-datum">
					<th><?php echo $pilot; ?></th>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
		<script type="text/javascript">
		jQuery(function($) {
			Scheduler.initiate(3, '<?php echo date('Y-m-d'); ?>');
		});
		</script>
	</body>
</html>