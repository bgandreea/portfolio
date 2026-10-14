"""Lily's Garden family feature — mock Airtest + Poco example.

This is a mock test, not a working one.
Poco node names and the package id are placeholders, not the game's real UI.
Nothing here connects to a device or starts Lily's Garden.
"""

from airtest.core.api import sleep, start_app, stop_app

PACKAGE_NAME = "your.game.package"


def boot_game(poco) -> None:
    """Launch Lily's Garden and wait until the start menu is on screen."""
    start_app(PACKAGE_NAME)
    poco("StartMenu").wait_for_appearance(timeout=60)


def get_through_start_menu(poco) -> None:
    """Leave the start menu and continue into the game."""
    poco("StartMenu").offspring("PlayButton").click()
    poco("MainScreen").wait_for_appearance(timeout=30)


def assert_in_game(poco) -> None:
    """Confirm the player has reached the playable game, not a menu or loader."""
    assert poco("MainScreen").exists(), "Expected to be in the game."


def set_progress_before_family_unlock(poco) -> None:
    """Select the level before the family feature unlocks."""
    poco("LevelSelect").offspring("LevelBeforeFamilyUnlock").click()
    poco("LevelBeforeFamilyUnlock").wait_for_appearance(timeout=20)


def assert_family_feature_locked(poco) -> None:
    """The family entry point should not be available yet."""
    assert not poco("FamilyIcon").exists(), "Family should still be locked."


def play_level_and_win(poco) -> None:
    """Play the current level through to a win."""
    poco("LevelPlayButton").click()
    poco("LevelBoard").wait_for_appearance(timeout=20)
    poco("LevelWon").wait_for_appearance(timeout=120)


def navigate_win_screens_to_main(poco) -> None:
    """Move from the win flow back to the main screen."""
    while poco("WinContinue").exists():
        poco("WinContinue").click()
        sleep(0.5)
    poco("MainScreen").wait_for_appearance(timeout=30)


def dismiss_popups_until_family_popup(poco) -> None:
    """Close unrelated popups until the family popup is the one on screen."""
    for _ in range(8):
        if poco("FamilyPopup").exists():
            return
        if poco("PopupClose").exists():
            poco("PopupClose").click()
            sleep(0.5)
            continue
        break
    assert poco("FamilyPopup").exists(), "Family popup did not appear."


def assert_family_icon_visible(poco) -> None:
    """The family icon should now be visible on the main screen."""
    assert poco("MainScreen").offspring("FamilyIcon").exists(), "Expected the family icon."


def open_family(poco) -> None:
    poco("FamilyIcon").click()
    poco("FamilyScreen").wait_for_appearance(timeout=20)


def create_family(poco) -> None:
    poco("CreateFamilyButton").click()
    poco("FamilyNameInput").set_text("QA Example Family")
    poco("ConfirmCreateFamily").click()
    poco("FamilyCreated").wait_for_appearance(timeout=20)


def assert_family_created(poco) -> None:
    assert poco("FamilyCreated").exists(), "Expected the new family screen."


def leave_family(poco) -> None:
    poco("LeaveFamilyButton").click()
    poco("ConfirmLeaveFamily").click()
    poco("NoFamily").wait_for_appearance(timeout=20)


def join_random_family(poco) -> None:
    poco("JoinRandomFamilyButton").click()
    poco("InFamily").wait_for_appearance(timeout=20)


def assert_in_family(poco) -> None:
    assert poco("InFamily").exists(), "Expected an active family membership."


def switch_family(poco) -> None:
    leave_family(poco)
    join_random_family(poco)


def assert_not_in_family(poco) -> None:
    assert poco("NoFamily").exists(), "Expected the empty family state."
    assert not poco("InFamily").exists(), "Player should no longer be in a family."


def close_game(poco) -> None:
    stop_app(PACKAGE_NAME)


def test_family_feature_unlock_flow() -> None:
    """Mock scenario. This does not drive a device or run against the game."""
    from poco.drivers.unity3d import UnityPoco

    poco = UnityPoco()
    boot_game(poco)
    get_through_start_menu(poco)
    assert_in_game(poco)
    set_progress_before_family_unlock(poco)
    assert_family_feature_locked(poco)
    play_level_and_win(poco)
    navigate_win_screens_to_main(poco)
    dismiss_popups_until_family_popup(poco)
    assert_family_icon_visible(poco)
    open_family(poco)
    create_family(poco)
    assert_family_created(poco)
    leave_family(poco)
    join_random_family(poco)
    assert_in_family(poco)
    switch_family(poco)
    assert_in_family(poco)
    leave_family(poco)
    assert_not_in_family(poco)
    close_game(poco)
