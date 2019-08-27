<?php print render($title_prefix); ?>

<?php if ($title): ?>
  <h1 class="title" id="page-title">
    <?php print $title; ?>
  </h1>

  <?php if ($breadcrumb): ?>
      <div class="block block--breadcrumb">
        <?php print $breadcrumb; ?>
      </div>
  <?php endif; ?>
<?php endif; ?>

<?php print render($title_suffix); ?>

<div<?php print $attributes; ?>>
  <?php print $content; ?>
</div>
