"""empty message

Revision ID: f42361864438
Revises: 14ae1d45ff32
Create Date: 2021-11-07 23:59:59.114790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f42361864438"
down_revision = "14ae1d45ff32"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("organization", "fakeemail")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "organization",
        sa.Column(
            "fakeemail", sa.VARCHAR(length=255), autoincrement=False, nullable=True
        ),
    )
    # ### end Alembic commands ###
