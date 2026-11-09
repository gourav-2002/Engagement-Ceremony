Add-Type -AssemblyName System.Drawing

$srcPath = 'd:\hemant Engagment Ceremony\public\Hemant & Kritika Engagement Invitation.png'
$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height
Write-Host "Width: $w, Height: $h"

$half = [int]($w / 2)

# Left half
$leftBmp = New-Object System.Drawing.Bitmap($half, $h)
$g1 = [System.Drawing.Graphics]::FromImage($leftBmp)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g1.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
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
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$srcRect2 = New-Object System.Drawing.Rectangle($half, 0, $rightW, $h)
$dstRect2 = New-Object System.Drawing.Rectangle(0, 0, $rightW, $h)
$g2.DrawImage($img, $dstRect2, $srcRect2, [System.Drawing.GraphicsUnit]::Pixel)
$g2.Dispose()
$rightBmp.Save('d:\hemant Engagment Ceremony\public\door-right.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$rightBmp.Dispose()

$img.Dispose()
Write-Host "Saved high quality door-left.jpg and door-right.jpg successfully from png!"

