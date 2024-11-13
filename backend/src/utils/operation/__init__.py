from .list_filter import apply_filters, listop, filterRefactoring


def createop(model_class, request, fields):
    """
    :return: An instance of `model_class` with the fields set.
    getattr(request, field): accept all object field like request.
    example
    # instance = User(
    #     username=request.username,
    #     email=request.email,
    #     phone=request.phone,
    #     password=Hash.crypt(request.password),
    # )
    """
    # Create an instance of the model class
    instance = model_class()

    # Set attributes based on `fields` list
    for field in fields:
        if hasattr(request, field):
            setattr(instance, field, getattr(request, field))

    return instance


def updateOp(instance, request, fields):
    for field in fields:
        if hasattr(request, field) and getattr(request, field) is not None:
            setattr(instance, field, getattr(request, field))
