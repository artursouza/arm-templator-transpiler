# Personal Notes / Considerations

* Deploying resources at different scopes should feel simple and built-in
* Everything inside a module should be potentially overridable
* Should we have special syntax for overriding resource props, or just declare as a module with a single (default?) resource inside?
* Deployment syntax should be explicit
* Should we include support for non-JSON properties?
* Can we always infer dependency order, or do we need syntax to specify custom dependency order?
* Need to consider how 'actions' on resources are declared (e.g. listKeys on a storage account).
* Breaking out into a different language: would syntax like "resource javascript ..." be annoying to work with, or should in-lining a different language be simpler?