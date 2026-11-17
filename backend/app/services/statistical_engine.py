from typing import List, Dict, Any, Optional
import numpy as np
from scipy import stats

class StatisticalEngine:
    """
    Real-time empirical statistical engine for decision research.
    Computes rigorous parametric and non-parametric tests, effect sizes,
    and cognitive trust calibration curves.
    """

    @staticmethod
    def compare_conditions(
        sample_a: List[float],
        sample_b: List[float],
        label_a: str = "Condition A",
        label_b: str = "Condition B",
        metric_name: str = "Score",
    ) -> Dict[str, Any]:
        """
        Runs Welch's t-test (unequal variances), Mann-Whitney U test,
        and computes Cohen's d effect size.
        """
        arr_a = np.array(sample_a, dtype=float)
        arr_b = np.array(sample_b, dtype=float)

        n_a, n_b = len(arr_a), len(arr_b)
        if n_a < 2 or n_b < 2:
            return {
                "metric": metric_name,
                "label_a": label_a,
                "label_b": label_b,
                "n_a": n_a,
                "n_b": n_b,
                "mean_a": float(np.mean(arr_a)) if n_a > 0 else 0.0,
                "mean_b": float(np.mean(arr_b)) if n_b > 0 else 0.0,
                "error": "Insufficient sample size (minimum 2 samples required per condition)",
            }

        mean_a, mean_b = float(np.mean(arr_a)), float(np.mean(arr_b))
        std_a, std_b = float(np.std(arr_a, ddof=1)), float(np.std(arr_b, ddof=1))

        # Welch's t-test (does not assume equal population variance)
        t_stat, p_value_t = stats.ttest_ind(arr_a, arr_b, equal_var=False)

        # Mann-Whitney U test (non-parametric rank-sum test)
        try:
            u_stat, p_value_u = stats.mannwhitneyu(arr_a, arr_b, alternative="two-sided")
        except Exception:
            u_stat, p_value_u = 0.0, 1.0

        # Cohen's d effect size
        # Pooled standard deviation
        numerator = (n_a - 1) * (std_a ** 2) + (n_b - 1) * (std_b ** 2)
        pooled_std = np.sqrt(numerator / (n_a + n_b - 2)) if (n_a + n_b - 2) > 0 else 1.0
        cohens_d = (mean_a - mean_b) / pooled_std if pooled_std > 0 else 0.0

        # Interpretation of effect size
        abs_d = abs(cohens_d)
        if abs_d < 0.2:
            effect_interpretation = "negligible"
        elif abs_d < 0.5:
            effect_interpretation = "small"
        elif abs_d < 0.8:
            effect_interpretation = "medium"
        else:
            effect_interpretation = "large"

        return {
            "metric": metric_name,
            "label_a": label_a,
            "label_b": label_b,
            "n_a": n_a,
            "n_b": n_b,
            "mean_a": round(mean_a, 2),
            "mean_b": round(mean_b, 2),
            "std_a": round(std_a, 2),
            "std_b": round(std_b, 2),
            "welch_t": {
                "t_statistic": round(float(t_stat), 3),
                "p_value": round(float(p_value_t), 4),
                "is_significant_05": bool(p_value_t < 0.05),
                "is_significant_01": bool(p_value_t < 0.01),
            },
            "mann_whitney_u": {
                "u_statistic": round(float(u_stat), 2),
                "p_value": round(float(p_value_u), 4),
                "is_significant_05": bool(p_value_u < 0.05),
            },
            "cohens_d": round(float(cohens_d), 3),
            "effect_interpretation": effect_interpretation,
        }

    @staticmethod
    def compute_trust_calibration_curve(
        confidences: List[float],
        accuracies: List[float],
        n_bins: int = 5,
    ) -> Dict[str, Any]:
        """
        Binned calibration plot data: compares subjective confidence against observed accuracy.
        Computes Expected Calibration Error (ECE).
        """
        if not confidences or len(confidences) != len(accuracies):
            return {"bins": [], "expected_calibration_error": 0.0}

        conf_arr = np.array(confidences, dtype=float)
        acc_arr = np.array(accuracies, dtype=float)
        total_samples = len(conf_arr)

        bin_edges = np.linspace(0.0, 1.0, n_bins + 1)
        bin_data = []
        ece = 0.0

        for i in range(n_bins):
            low, high = bin_edges[i], bin_edges[i + 1]
            if i == n_bins - 1:
                mask = (conf_arr >= low) & (conf_arr <= high)
            else:
                mask = (conf_arr >= low) & (conf_arr < high)

            count = int(np.sum(mask))
            if count > 0:
                avg_conf = float(np.mean(conf_arr[mask]))
                avg_acc = float(np.mean(acc_arr[mask]))
                gap = abs(avg_acc - avg_conf)
                ece += (count / total_samples) * gap
            else:
                avg_conf = (low + high) / 2.0
                avg_acc = 0.0
                gap = 0.0

            bin_data.append({
                "bin_index": i,
                "range_label": f"{int(low*100)}%-{int(high*100)}%",
                "count": count,
                "mean_confidence": round(avg_conf, 3),
                "observed_accuracy": round(avg_acc, 3),
                "calibration_gap": round(gap, 3),
            })

        return {
            "bins": bin_data,
            "expected_calibration_error": round(float(ece), 4),
            "perfect_calibration_reference": [
                {"confidence": 0.0, "accuracy": 0.0},
                {"confidence": 1.0, "accuracy": 1.0},
            ],
        }

    @staticmethod
    def compute_reliance_metrics(events: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Computes Agreement Rate, Over-reliance Rate, and Under-reliance Rate.
        """
        if not events:
            return {
                "overall_agreement_rate": 0.0,
                "over_reliance_rate": 0.0,
                "under_reliance_rate": 0.0,
                "total_trials": 0,
            }

        total = len(events)
        agreements = sum(1 for e in events if e.get("agreed_with_ai"))
        
        # Biased scenarios (where AI was deliberately wrong)
        biased_trials = [e for e in events if e.get("is_injected_bias")]
        biased_count = len(biased_trials)
        over_reliance_count = sum(1 for e in biased_trials if e.get("agreed_with_ai"))

        # Optimal scenarios (where AI was correct)
        optimal_trials = [e for e in events if not e.get("is_injected_bias")]
        optimal_count = len(optimal_trials)
        under_reliance_count = sum(1 for e in optimal_trials if not e.get("agreed_with_ai"))

        return {
            "overall_agreement_rate": round(agreements / total, 3) if total > 0 else 0.0,
            "over_reliance_rate": round(over_reliance_count / biased_count, 3) if biased_count > 0 else 0.0,
            "under_reliance_rate": round(under_reliance_count / optimal_count, 3) if optimal_count > 0 else 0.0,
            "total_trials": total,
            "biased_trials_count": biased_count,
            "optimal_trials_count": optimal_count,
        }
