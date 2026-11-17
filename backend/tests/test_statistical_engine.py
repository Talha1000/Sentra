import pytest
from app.services.statistical_engine import StatisticalEngine

def test_welch_t_test_and_cohens_d():
    """
    Verifies that significant difference between two distributions produces expected t and d statistics.
    """
    sample_a = [10.0, 11.0, 12.0, 10.5, 11.5, 9.8, 10.2]  # mean ~ 10.7
    sample_b = [20.0, 21.5, 22.0, 19.8, 20.2, 21.0, 22.5]  # mean ~ 21.0

    res = StatisticalEngine.compare_conditions(
        sample_a=sample_a,
        sample_b=sample_b,
        label_a="Control",
        label_b="Treatment",
        metric_name="Decision Accuracy",
    )

    assert res["welch_t"]["is_significant_05"] is True
    assert res["welch_t"]["p_value"] < 0.001
    assert res["cohens_d"] < -5.0  # Large negative effect (Treatment > Control)
    assert res["effect_interpretation"] == "large"

def test_insufficient_sample_size_handling():
    """
    Samples with < 2 observations return graceful error message instead of crashing.
    """
    res = StatisticalEngine.compare_conditions(
        sample_a=[5.0],
        sample_b=[6.0],
    )
    assert "error" in res

def test_trust_calibration_curve():
    """
    Tests binning and Expected Calibration Error computation.
    """
    confidences = [0.1, 0.35, 0.55, 0.75, 0.95]
    accuracies = [0.1, 0.40, 0.50, 0.80, 0.90]

    curve = StatisticalEngine.compute_trust_calibration_curve(confidences, accuracies, n_bins=5)
    assert len(curve["bins"]) == 5
    assert curve["expected_calibration_error"] >= 0.0
    assert curve["expected_calibration_error"] < 0.1  # Very close to perfectly calibrated
