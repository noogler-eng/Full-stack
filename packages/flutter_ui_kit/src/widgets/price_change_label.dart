import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class PriceChangeLabel extends StatelessWidget {
  final double changePercent;

  const PriceChangeLabel({super.key, required this.changePercent});

  @override
  Widget build(BuildContext context) {
    final isGain = changePercent >= 0;
    final color = isGain ? AppColors.gain : AppColors.loss;
    final sign = isGain ? '+' : '';
    
    // we dont need to use {} when we only have to use that value not
    // using . on that
    return Text(
      '$sign${changePercent.abs().toStringAsFixed(2)}%',
      style: TextStyle(color: color),
    );
  }
} 