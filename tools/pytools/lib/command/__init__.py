import sys
from subprocess import PIPE, Popen
from typing import Optional, Any, TextIO


def run(*args: str, msg: Optional[str] = None, verbose: bool = False, **kwargs: Any) -> Popen:
    sys.stdout.flush()
    if verbose:
        print(f"$ {' '.join(args)}")

    p = Popen(args, **kwargs)
    code = p.wait()
    if code != 0:
        err = f"\nfailed to run: {args}\nexit with code: {code}\n"
        if msg:
            err += f"error message: {msg}\n"
        raise RuntimeError(err)

    return p


def run_pipe(*args: str, msg: Optional[str] = None, verbose: bool = False, **kwargs: Any) -> TextIO:
    p = run(*args, msg=msg, verbose=verbose, stdout=PIPE, universal_newlines=True, **kwargs)
    return p.stdout  # type: ignore


def find_command(command: str, msg: Optional[str] = None) -> str:
    return run_pipe("which", command, msg=msg).read().strip()
