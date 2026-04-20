$ErrorActionPreference = 'Continue'

& (Join-Path $PSScriptRoot 'start-django-demo.ps1')

try {
  & (Join-Path $PSScriptRoot 'start-php-demo.ps1')
} catch {
  Write-Warning $_.Exception.Message
}
