# survey

Github：[https://github.com/go-survey/survey](https://github.com/go-survey/survey)

文档：[https://pkg.go.dev/github.com/AlecAivazis/survey/v2](https://pkg.go.dev/github.com/AlecAivazis/survey/v2)

<br />

## 安装

```bash
# 安装最新版
go get github.com/AlecAivazis/survey/v2

go get github.com/go-survey/survey/v2

# 最新版本在Windows上输入框有Bug, 所以这里回退到2.2.13版本
go get github.com/AlecAivazis/survey/v2@v2.2.13
```

<br />

## 输入框

::: details （1）输入框

```go
package main

import (
	"strings"

	"github.com/AlecAivazis/survey/v2"
)

// DeleteQuestionIcon 删除问题行首前的图标, survey全局生效
func DeleteQuestionIcon() {
	lines := strings.Split(survey.InputQuestionTemplate, "\n")
	if len(lines) > 3 {
		lines = append(lines[:2], lines[3:]...)
		newTemplate := strings.Join(lines, "\n")
		survey.InputQuestionTemplate = newTemplate
	}
	var InputQuestionTemplate = `
{{- color "default+hb"}}{{ .Message }} {{color "reset"}}
{{- if .ShowAnswer}}
  {{- color "cyan"}}{{.Answer}}{{color "reset"}}{{"\n"}}
{{- else if .PageEntries -}}
  {{- .Answer}} [Use arrows to move, enter to select, type to continue]
  {{- "\n"}}
  {{- range $ix, $choice := .PageEntries}}
    {{- if eq $ix $.SelectedIndex }}{{color $.Config.Icons.SelectFocus.Format }}{{ $.Config.Icons.SelectFocus.Text }} {{else}}{{color "default"}}  {{end}}
    {{- $choice.Value}}
    {{- color "reset"}}{{"\n"}}
  {{- end}}
{{- else }}
  {{- if or (and .Help (not .ShowHelp)) .Suggest }}{{color "cyan"}}[
    {{- if and .Help (not .ShowHelp)}}{{ print .Config.HelpInput }} for help {{- if and .Suggest}}, {{end}}{{end -}}
    {{- if and .Suggest }}{{color "cyan"}}{{ print .Config.SuggestInput }} for suggestions{{end -}}
  ]{{color "reset"}} {{end}}
  {{- if .Default}}{{color "white"}}({{.Default}}) {{color "reset"}}{{end}}
  {{- .Answer -}}
{{- end}}`
	survey.InputQuestionTemplate = InputQuestionTemplate
}

func main() {

	DeleteQuestionIcon()

	// 问一个问题
	var name string
	options := []survey.AskOpt{
		survey.WithShowCursor(true),
		survey.WithValidator(survey.Required),
	}
	err := survey.AskOne(&survey.Input{Message: "What is your name?"}, &name, options...)
	if err != nil {
		panic(err)
	}
}

```



```go
package main

import (
	"fmt"

	"github.com/AlecAivazis/survey/v2"
)

func main() {
	var question = []*survey.Question{
		{
			Name:      "abc",
			Prompt:    &survey.Input{Default: "", Message: "What is your name?"},
			Validate:  survey.Required,
			Transform: survey.Title,
		},
	}
	var answer string
	err := survey.Ask(question, &answer)
	if err != nil {
		panic(err)
	}

	fmt.Println(answer)
}
```

:::