"""adding phone field in user

Revision ID: 6cb6d67b2c89
Revises: 94491e002b83
Create Date: 2024-09-17 04:24:31.189677

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6cb6d67b2c89'
down_revision: Union[str, None] = '94491e002b83'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('phone', sa.String(length=11), nullable=True))
    op.create_unique_constraint(None, 'users', ['phone'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'phone')
    # ### end Alembic commands ###
