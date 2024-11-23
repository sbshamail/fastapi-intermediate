from datetime import datetime, timezone
from types import SimpleNamespace
from typing import Any, Dict, List, Optional


# [["first_name", "ahmed"], ["id", 1]] #passing data through internet only accept json or string
# [("first_name", "ahmed"), ("id", 1)] #converting
def extractTupleArray(data: List):
    print(data)
    return [tuple(sublist) for sublist in data]

def dict_to_object(d: Dict[str, Any]):
    return SimpleNamespace(**d)   


date_formats = [
    "dd-MM-yyyy",
    "dd/MM/yyyy",
    "d/M/yyyy",
    "dd/M/yyyy",
    "d/MM/yyyy",
    "dd-M-yyyy",
    "d-MM-yyyy",
    "d-M-yyyy",
    "d-MMM-yy",
    "dd-MMM-yy",
    "d-MMM-yyyy",
    "yyyy-MM-ddTHH:mm:ss.SSSZ",
    "yyyy-MM-ddTHH:mm:ss.SSS",
    "yyyy-MM-ddTHH:mm:ss",
    "yyyy-MM-dd",
]


def parse_date(
    date_string: str, formats: Optional[list[str]] = date_formats
) -> Optional[datetime]:
    for fmt in formats:
        try:
            # Convert the format to Python's strftime format
            fmt = (
                fmt.replace("dd", "%d")
                .replace("d", "%d")
                .replace("MM", "%m")
                .replace("M", "%m")
                .replace("yyyy", "%Y")
                .replace("yy", "%y")
                .replace("HH", "%H")
                .replace("mm", "%M")
                .replace("ss", "%S")
                .replace("SSS", "%f")
            )
            local_dt = datetime.strptime(date_string, fmt)
            utc_dt = local_dt.replace(tzinfo=timezone.utc)
            return utc_dt
        except ValueError:
            continue
    return None


# start_date = start_date if start_date is not None else None
# end_date = end_date or datetime.now()
# if type(start_date) == "str":
#     start_date = datetime.strptime(start_date, "%d-%m-%Y")
# date_end = datetime.now()
# # Print the date object
# print(start_date)
# # If you need to format it in a specific way
# formatted_date = start_date.strftime("%d-%m-%Y")
# formatted_date_end = date_end.strftime("%d-%m-%Y")
# print(formatted_date_end)
