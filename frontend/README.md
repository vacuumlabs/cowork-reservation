# Editing and updating `/shared` package

Open `models.ts` file and edit the file

Once the changes are done, open package.json file in `/shared` folder

Change the version of the package. eg. `"version": "1.0.1"` -> `"version": "1.0.2"`

After that navigate to `/frontend/tablet` folder and run the following command:
`yarn upgrade shared`

Run the same command for `/frontend/admin` folder

Now you have modified the `/shared/models` file with full effect
