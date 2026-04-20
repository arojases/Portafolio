$ErrorActionPreference = 'Stop'

$repoPath = Join-Path $PSScriptRoot '..\.cache\github-repos\Gestion-de-autos--PHP'
$repoPath = [System.IO.Path]::GetFullPath($repoPath)

if (-not (Test-Path -LiteralPath $repoPath)) {
  throw "No se encontro el repositorio PHP en $repoPath"
}

$php = Get-Command php -ErrorAction SilentlyContinue

if (-not $php) {
  throw 'No se encontro php.exe en esta maquina. Instala PHP o agregalo al PATH para levantar este demo.'
}

$logDir = Join-Path $repoPath '.demo-logs'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$stdout = Join-Path $logDir 'php.stdout.log'
$stderr = Join-Path $logDir 'php.stderr.log'

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

if (Test-PortOpen 8102) {
  Write-Output 'El demo PHP ya esta corriendo en http://127.0.0.1:8102/'
  exit 0
}

Start-Process -FilePath $php.Source `
  -ArgumentList '-S', '127.0.0.1:8102', '-t', $repoPath `
  -WorkingDirectory $repoPath `
  -RedirectStandardOutput $stdout `
  -RedirectStandardError $stderr `
  -WindowStyle Hidden | Out-Null

Write-Output 'Demo PHP iniciado en http://127.0.0.1:8102/'
