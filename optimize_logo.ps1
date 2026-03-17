
param(
    [string]$srcPath = "c:\Users\Sruja\OneDrive\Documents\Desktop\vaibhav-2k26\public\LOGO.png",
    [string]$destPath = "c:\Users\Sruja\OneDrive\Documents\Desktop\vaibhav-2k26\public\logo-optimized-new.png"
)

Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param($src, $dest)
    try {
        $img = [System.Drawing.Image]::FromFile($src)
        # Resize to 512x512 max or keep original aspect ratio if not square
        $newHeight = [int]($img.Height * (512 / $img.Width))
        $newWidth = 512
        if ($newHeight -gt 512) {
             $newWidth = [int]($img.Width * (512 / $img.Height))
             $newHeight = 512
        }

        $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($bitmap)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        $bitmap.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $g.Dispose()
        $bitmap.Dispose()
        $img.Dispose()
        Write-Host "Success: $dest created."
    } catch {
        Write-Error "Error: $_"
    }
}

Optimize-Image -src $srcPath -dest $destPath
