import subprocess

db_init_output = subprocess.run("flask db init", capture_output=True, text=True)
db_init_output_str = str(db_init_output.stdout + db_init_output.stderr)
print(db_init_output_str)
if db_init_output.stderr != "":
    raise Exception(str(db_init_output.stderr).replace("\n", ""))

migrate_output = subprocess.run("flask db migrate", capture_output=True, text=True)
migrate_output_str = str(migrate_output.stdout + migrate_output.stderr)

if "INFO  [alembic.env] No changes in schema detected." in migrate_output_str:
    raise Exception(str(migrate_output.stderr).replace("\n", ""))
else:
    if "ERROR [flask_migrate]" in migrate_output_str:
        raise Exception(str(migrate_output.stderr).replace("\n", ""))
    elif " ...  done" in migrate_output_str:
        filename = migrate_output_str
        filename = filename[
            filename.find("migrations\\versions\\") : filename.find(".py") + 4
        ]
        migration_file = open(filename, "r+")
        lines = migration_file.readlines()
        moved_lines = []
        for idx, line in enumerate(lines):
            if "op.drop_table" in line:
                moved_lines.append(line)
                lines[idx] = ""
            elif "# ### end Alembic commands ###" in line:
                for elem in moved_lines:
                    lines.insert(idx, elem)
                    moved_lines.pop(0)
            pass
        migration_file.seek(0)
        migration_file.truncate()
        migration_file.write("".join(lines))
        migration_file.close()
        print(filename)
        upgrade_output = subprocess.run(
            "flask db upgrade", capture_output=True, text=True
        )
        upgrade_output_str = str(upgrade_output.stdout + upgrade_output.stderr)
        if "Traceback (most recent call last):" in upgrade_output_str:
            raise Exception(upgrade_output_str + "\n" + filename)
        else:
            print(upgrade_output_str)
            print("successful migration of " + filename)
    else:
        raise Exception(migrate_output_str)
