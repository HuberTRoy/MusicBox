from setuptools import setup, find_packages

setup(
    name='Music-Player',
    version='1.0.5.1',
    packages=['MusicPlayer'],
    install_requires=[
        'PyQt5',
        'pycryptodome',
        'eyed3==0.8.0',
        'quamash',
        'requests'
    ],
    package_data={
        '': ['apis/*.py',
        'features/*.py',
        'networks/*.py',
        'QSS/*.qss',
        'resource/*.png',
        'resource/*.ico',
        'widgets/*.py',
        'logger/*.py',
        'dbManager/*.py'],
        },
    entry_points={
        'console_scripts': [
            'musicplayer = MusicPlayer.music:start'
        ],
    },

    license='MIT',
    author='cyrbuzz',
    author_email='cyrbuzz@foxmail.com',
    url='https://github.com/HuberTRoy/MusicPlayer',
    description='A beautiful music player for everyone. Enjoy yourself~.',
    keywords=['music', 'netease', 'xiami', 'qq', 'player'],
)