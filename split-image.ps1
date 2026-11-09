Add-Type -AssemblyName System.Drawing
$srcPath = 'd:\hemant Engagment Ceremony\public\card-cover-new.jpg'
$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height
Write-Host "Width: $w, Height: $h"

$half = [int]($w / 2)

# Left half
$leftBmp = New-Object System.Drawing.Bitmap($half, $h)
$g1 = [System.Drawing.Graphics]::FromImage($leftBmp)
$srcRect1 = New-Object System.Drawing.Rectangle(0, 0, $half, $h)
$dstRect1 = New-Object System.Drawing.Rectangle(0, 0, $half, $h)
$g1.DrawImage($img, $dstRect1, $srcRect1, [System.Drawing.GraphicsUnit]::Pixel)
$g1.Dispose()
$leftBmp.Save('d:\hemant Engagment Ceremony\public\door-left.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$leftBmp.Dispose()

# Right half
$rightW = $w - $half
$rightBmp = New-Object System.Drawing.Bitmap($rightW, $h)
$g2 = [System.Drawing.Graphics]::FromImage($rightBmp)
$srcRect2 = New-Object System.Drawing.Rectangle($half, 0, $rightW, $h)
$dstRect2 = New-Object System.Drawing.Rectangle(0, 0, $rightW, $h)
$g2.DrawImage($img, $dstRect2, $srcRect2, [System.Drawing.GraphicsUnit]::Pixel)
$g2.Dispose()
$rightBmp.Save('d:\hemant Engagment Ceremony\public\door-right.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$rightBmp.Dispose()

$img.Dispose()
Write-Host "Done! door-left.jpg and door-right.jpg saved."

