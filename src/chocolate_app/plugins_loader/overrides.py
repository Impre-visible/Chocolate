from typing import List, Callable, Any
from enum import Enum

OVERRIDE_MAP: dict[str, Callable[[Any], None]] = {}

class OverrideType(Enum):
    SCAN_MOVIE = "scan_movie"
    SCAN_SERIE = "scan_serie"
    SCAN_GAME = "scan_game"
    SCAN_MUSIC = "scan_music"
    SCAN_BOOK = "scan_book"

def have_override(override_name):
    return override_name in OVERRIDE_MAP


def link(override_name: str):
    def decorator(handler):
        def wrapper(*args, **kwargs):
            handler(*args, **kwargs)
        OVERRIDE_MAP[override_name] = wrapper
    return decorator

def execute_override(override_name, *args, **kwargs):
    if override_name in OVERRIDE_MAP:
        return OVERRIDE_MAP[override_name](*args, **kwargs)