---
title: Unit Testing with Swift
slug: unit-testing-with-swift-2
date: "2016-02-11T09:42:00.000Z"
---

Inspired by the Unit Testing portion of of this [post](http://codevoyagers.com/2016/02/09/transitioning-from-objective-c-to-swift-in-4-steps-without-rewriting-the-existing-code/?linkId=21112689) by Gergely Orosz I decided to take another look at unit testing view models in the app I work on in my day job.

Most of our view models are created with an instance of our API/data controller (practicing good dependency injection). Previously when doing view model testing, we would create an instance of the data controller using mock credentials and a mock set of permissions. Then we would need to stub our network call using [OHHTTPStubs](https://github.com/AliSoftware/OHHTTPStubs) to mock any API calls that would be made.

This works, but means we basically had code running through every layer of our app just to test one view model.

If we were using Objective-C we could use a mocking library and do this a little better by mocking the methods we were depending on the data controller for. So far, nothing like this exists when working with Swift-only classes/structs.

Instead, taking cues from Gergely's post, I instead decided to work with a subclass of our data controller. For each of the methods that our view model relies on we can create a version that returns what we want.

Let's say we have a view model that exposes a method to start refreshing it's list of people (this could just be locally or it could be calling our API and getting totally new objects — it doesn't matter to the view model). All we care about is that when this method is called, our data controller's "fetchData()" method is called and if that returns an error the view model returns an appropriate error.

Here's a simple example of this:

```
class ViewModel {

  let dataController: DataController

  init(dataController: DataController) {
    self.dataController = dataController
  }

  func refreshData() -> Error? {
    let result = self.dataController.fetchData()
    switch result {
      case .Data:
        ...do something with the data
        return nil
      case let .Error(error):
        return error
    }
  }

}
```

To check whether the correct behavior happens, we can add a couple variables to our mock data controller to keep track of what is going on and what data should be returned.

```
class DataController {

  func fetchData() -> Result {
    ...implementation
  }

}

class MockDataController: DataController {
  var fetchDataCalled = false
  var dataToReturnOnFetch = .Error

  override func fetchData() -> Result {
    fetchDataCalled = true
    return dataToReturnOnFetch
  }
}
```

Now when we are creating our test, we can create a MockDataController, set the data we want to return (or an error), and then pass this mock object when creating the view model.

A test might look like this:

```
func testViewModelReturnAnErrorWhenFetchingFails() {
   // arrange
   let mockDataController = MockDataController()
   mockDataController.dataToReturnOnFetch = .Error
   let viewModel = ViewModel(dataController: mockDataController)

   // act
   let error = viewModel.refreshData()

   // assert
   expect(fetchDataCalled) = true
   expect(error) != nil
}
```

---

There is one caveat to this... currently if a method is incompatible with Objective-C, you are unable to override it if that method was declared in an extension ([see here for more on this](http://stackoverflow.com/questions/27109006/can-you-override-between-extensions-in-swift-or-not-compiler-seems-confused)).

We have been using extensions to organize related code within a file. We'll have to adjust this for any methods that we want to be available to override for testing.
