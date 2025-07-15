<pre>
$: sudo python3 -m venv /opt/certbot
$: sudo /opt/certbot/bin/pip install --upgrade pip
$: sudo /opt/certbot/bin/pip install certbot
$: sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot

$: sudo certbot certonly --standalone

# be sure if using namecheap to add the CAA Record issue letsencrypt.org
</pre>
import webbrowser
import tempfile
import os

def display_html_with_mathml(html_content: str):
    # Create a temporary HTML file
    with tempfile.NamedTemporaryFile('w', delete=False, suffix='.html', encoding='utf-8') as f:
        f.write(html_content)
        temp_file_path = f.name

    # Open the file in the default web browser
    webbrowser.open('file://' + os.path.abspath(temp_file_path))

# Example HTML with MathML
html_string = r'''
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>College Statistics Formula Sheet</title>
  <!-- Load MathJax -->
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }
    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
    section {
      margin-bottom: 2.5rem;
    }
    h2 {
      border-bottom: 2px solid #333;
      padding-bottom: 0.2rem;
      margin-bottom: 1rem;
    }
    p {
      margin: 0.5rem 0;
    }
    .formula {
      font-size: 1.25rem;
      margin: 0.5rem 0 1.5rem 0;
    }
  </style>
</head>
<body>

  <h1>College Statistics Formula Sheet</h1>

  <section>
    <h2>Descriptive Statistics</h2>

    <p><strong>Sample Mean:</strong></p>
    <p class="formula">$$ \overline{x} = \frac{1}{n} \sum_{i=1}^{n} x_i $$</p>

    <p><strong>Population Mean:</strong></p>
    <p class="formula">$$ \mu = \frac{1}{N} \sum_{i=1}^{N} x_i $$</p>

    <p><strong>Sample Variance:</strong></p>
    <p class="formula">$$ s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \overline{x})^2 $$</p>

    <p><strong>Population Variance:</strong></p>
    <p class="formula">$$ \sigma^2 = \frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2 $$</p>

    <p><strong>Sample Standard Deviation:</strong></p>
    <p class="formula">$$ s = \sqrt{s^2} $$</p>

    <p><strong>Population Standard Deviation:</strong></p>
    <p class="formula">$$ \sigma = \sqrt{\sigma^2} $$</p>
  </section>

  <section>
    <h2>Probability</h2>

    <p><strong>Probability of event \( A \):</strong></p>
    <p class="formula">$$ P(A) = \frac{\text{Number of favorable outcomes}}{\text{Total number of outcomes}} $$</p>

    <p><strong>Complement Rule:</strong></p>
    <p class="formula">$$ P(A^c) = 1 - P(A) $$</p>

    <p><strong>Addition Rule (for mutually exclusive events):</strong></p>
    <p class="formula">$$ P(A \cup B) = P(A) + P(B) $$</p>

    <p><strong>Addition Rule (general):</strong></p>
    <p class="formula">$$ P(A \cup B) = P(A) + P(B) - P(A \cap B) $$</p>

    <p><strong>Multiplication Rule (independent events):</strong></p>
    <p class="formula">$$ P(A \cap B) = P(A) \times P(B) $$</p>

    <p><strong>Conditional Probability:</strong></p>
    <p class="formula">$$ P(A|B) = \frac{P(A \cap B)}{P(B)} $$</p>
  </section>

  <section>
    <h2>Distributions</h2>

    <p><strong>Binomial Probability:</strong></p>
    <p class="formula">$$ P(X = k) = \binom{n}{k} p^k (1-p)^{n-k} $$</p>

    <p><strong>Mean and Variance of Binomial:</strong></p>
    <p class="formula">$$ \mu = np, \quad \sigma^2 = np(1-p) $$</p>

    <p><strong>Normal Distribution PDF:</strong></p>
    <p class="formula">
      $$ f(x) = \frac{1}{\sigma \sqrt{2 \pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} $$
    </p>

    <p><strong>Standard Normal Variable:</strong></p>
    <p class="formula">$$ Z = \frac{X - \mu}{\sigma} $$</p>
  </section>

  <section>
    <h2>Inferential Statistics</h2>

    <p><strong>Confidence Interval for Mean (known \( \sigma \)):</strong></p>
    <p class="formula">$$ \overline{x} \pm z_{\alpha/2} \frac{\sigma}{\sqrt{n}} $$</p>

    <p><strong>Confidence Interval for Mean (unknown \( \sigma \)):</strong></p>
    <p class="formula">$$ \overline{x} \pm t_{\alpha/2, n-1} \frac{s}{\sqrt{n}} $$</p>

    <p><strong>Test Statistic for Mean (known \( \sigma):\)</strong></p>
    <p class="formula">$$ z = \frac{\overline{x} - \mu_0}{\sigma / \sqrt{n}} $$</p>

    <p><strong>Test Statistic for Mean (unknown \( \sigma \)):</strong></p>
    <p class="formula">$$ t = \frac{\overline{x} - \mu_0}{s / \sqrt{n}} $$</p>

    <p><strong>Sample Proportion Confidence Interval:</strong></p>
    <p class="formula">$$ \hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}} $$</p>
  </section>

  <section>
    <h2>Regression and Correlation</h2>

    <p><strong>Linear Regression Equation:</strong></p>
    <p class="formula">$$ y = a + bx $$</p>

    <p><strong>Slope \( b \):</strong></p>
    <p class="formula">
      $$ b = \frac{\sum (x_i - \overline{x})(y_i - \overline{y})}{\sum (x_i - \overline{x})^2} $$
    </p>

    <p><strong>Correlation Coefficient \( r \):</strong></p>
    <p class="formula">
      $$ r = \frac{\text{cov}(x,y)}{s_x s_y} $$
    </p>
  </section>

</body>
</html>
'''

# Display the HTML with MathML
display_html_with_mathml(html_string)
