# -*- mode: python -*-

block_cipher = None
Application_name = 'MusicBox'

a = Analysis(
    ['MusicPlayer\\music.py'],
    pathex=[
        './MusicPlayer',
        'C:\\Program Files (x86)\\Windows Kits\\10\\Redist\\ucrt\\DLLs\\x86',
    ],
    binaries=[],
    datas=[
        # resource
        ('./MusicPlayer/logger/running_log.log', 'logger'),
        ('./MusicPlayer/QSS', 'QSS'),
        ('./MusicPlayer/resource', 'resource'),

        # Other files
        ('LICENSE', '.'),
        ('README.md', '.'),
    ],
    hiddenimports=[
        # sub-packages
        'apis',
        'dbManager',
        'features',
        'logger',
        'networks',
        'widgets',
    ],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False
)

pyz = PYZ(
    a.pure,
    a.zipped_data,
    cipher=block_cipher
)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name=Application_name,
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name=Application_name
)
