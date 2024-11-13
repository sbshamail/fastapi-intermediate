from datetime import datetime
import json
from typing import List, Optional
from sqlalchemy import and_, or_
from src.utils.utility import extractTupleArray, parse_date
from sqlalchemy.orm.query import Query
from sqlalchemy.orm.session import Session


def filter_by_data_range(
    Model,
    query,
    column_name,
    start_date_str: Optional[str] = None,
    end_date_str: Optional[str] = None,
    formats: Optional[List] = None,
):
    data_column = getattr(Model, column_name)
    if start_date_str and end_date_str:
        start_date = parse_date(start_date_str)
        end_date = parse_date(end_date_str)
        if end_date is not None:
            end_date = end_date.replace(
                hour=23, minute=59, second=59, microsecond=999999
            )

        print(start_date, end_date)
        return query.filter(and_(data_column >= start_date, data_column <= end_date))
    elif start_date_str and end_date_str is None:
        start_date = parse_date(start_date_str)
        return query.filter(data_column >= start_date)
    elif start_date_str is None and end_date_str:
        end_date = parse_date(end_date_str)
        if end_date is not None:
            end_date = end_date.replace(
                hour=23, minute=59, second=59, microsecond=999999
            )
        return query.filter(data_column <= end_date)


def filter_by_number_range(Model, query, column_name, min_value, max_value):
    column = getattr(Model, column_name)
    return query.filter(column.between(min_value, max_value))


def filter_by_column_search_terms(Model, query, search_terms):
    search_filters = []
    for column_name, search_term in search_terms:
        column = getattr(Model, column_name)
        # Check if the term is a string to use `like` filter, otherwise use equality filter
        if isinstance(search_term, str):
            search_filters.append(column.like(f"%{search_term}%"))
        else:
            search_filters.append(column == search_term)

    return query.filter(and_(*search_filters))


def filter_by_global_search_terms(
    Model, query: Query, str_search_terms: List[str], search_term: str
):

    global_search_filters = []
    for column_name in str_search_terms:
        # column = Model[column_name] # not work because it is class object
        column = getattr(Model, column_name)
        global_search_filters.append(column.like(f"%{search_term}%"))

    return query.filter(or_(*global_search_filters))


def apply_filters(
    query: Query,
    Model,
    column_search_terms=None,
    search_term=None,
    str_search_terms=None,
    number_range=None,
    date_range=None,
):

    if column_search_terms:
        query = filter_by_column_search_terms(Model, query, column_search_terms)
    if search_term and str_search_terms:
        query = filter_by_global_search_terms(
            Model, query, str_search_terms, search_term
        )
    if number_range:
        column_name, min_value, max_value = number_range
        query = filter_by_number_range(Model, query, column_name, min_value, max_value)
    if date_range:
        column_name = date_range[0]
        start_date = date_range[1]
        end_date = datetime.now()
        if len(date_range) > 2:
            end_date = date_range[2] or end_date

        if not isinstance(end_date, str):
            end_date = end_date.strftime("%d-%m-%Y")
        query = filter_by_data_range(Model, query, column_name, start_date, end_date)

    # print(query)
    return query


def listop(db: Session, Model, filters: dict[str, any], skip: int = 0, limit: int = 10):
    # print(filters)
    query = db.query(Model)
    filtered_query = apply_filters(query, Model, **filters)
    total_count = filtered_query.count()
    paginated_results = filtered_query.offset(skip).limit(limit).all()
    result = [item for item in paginated_results]
    # results = filtered_query.all()
    return {"data": result, "total": total_count}


def filterRefactoring(searchTerm: str, columnSearchTerms: List, dateRange: List):
    columnFilters = []
    date_range: tuple = None

    if columnSearchTerms:
        terms = json.loads(columnSearchTerms)  # parse
        columnFilters = extractTupleArray(terms)
    if dateRange:
        dateRangeParse = json.loads(dateRange)
        date_range = tuple(dateRangeParse)

    filters = {
        "column_search_terms": columnFilters,  # accept tupple in array [("first_name", "string"), ("id", 1)],
        "search_term": searchTerm,
        "str_search_terms": ["username", "email", "phone"],  # for search term
        # "number_range": ("id", 1, 10),
        "date_range": date_range,
    }
    return filters


# def list(db: Session, skip: int = 0, limit: int = 10):
#     # total = db.query(User).count()
#     # items = db.query(User).offset(skip).limit(limit).all()

#     subquery = (
#         db.query(
#             User.role,
#             func.count(User.id).label("user_count"),
#             func.count(User.id)
#             .over()
#             .label("total_count"),  # Window function for total count
#         )
#         .group_by(User.role)
#         .subquery()
#     )

#     # Main query for paginated results
#     query = (
#         db.query(subquery.c.role, subquery.c.user_count, subquery.c.total_count)
#         .order_by(subquery.c.user_count.desc())  # Example ordering
#         .offset(skip)
#         .limit(limit)
#     )

#     # Execute the query
#     results = query.all()

#     # Extract total count from the results
#     total = results[0].total_count if results else 0

#     # Format results into a list of dictionaries
#     result = [{"role": item.role, "user_count": item.user_count} for item in results]

#     return {"data": result, "total": total}
