$ErrorActionPreference = 'Stop'

$repoPath = Join-Path $PSScriptRoot '..\.cache\github-repos\Gestion-de-contactos--django---bootstrap---sqlite-'
$repoPath = [System.IO.Path]::GetFullPath($repoPath)

if (-not (Test-Path -LiteralPath $repoPath)) {
  throw "No se encontro el repositorio Django en $repoPath"
}

$python = Get-Command python -ErrorAction Stop
$logDir = Join-Path $repoPath '.demo-logs'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$stdout = Join-Path $logDir 'django.stdout.log'
$stderr = Join-Path $logDir 'django.stderr.log'

function Test-PortOpen([int]$Port) {
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $async = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
    $success = $async.AsyncWaitHandle.WaitOne(400)

    if ($success -and $client.Connected) {
      $client.EndConnect($async)
      $client.Close()
      return $true
    }

    $client.Close()
    return $false
  } catch {
    return $false
  }
}

if (Test-PortOpen 8101) {
  Write-Output 'El demo Django ya esta corriendo en http://127.0.0.1:8101/'
  exit 0
}

$env:DJANGO_DEBUG = '1'

Start-Process -FilePath $python.Source `
  -ArgumentList 'manage.py', 'runserver', '127.0.0.1:8101' `
  -WorkingDirectory $repoPath `
  -RedirectStandardOutput $stdout `
  -RedirectStandardError $stderr `
  -WindowStyle Hidden | Out-Null

Write-Output 'Demo Django iniciado en http://127.0.0.1:8101/'
