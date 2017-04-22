from setuptools import setup

setup(
    name='usersmicroservice',
    packages=['src'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)